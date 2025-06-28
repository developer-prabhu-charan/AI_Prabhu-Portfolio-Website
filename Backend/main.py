import os
from dotenv import load_dotenv
import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# --- SETUP ---
# Load environment variables from .env file
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found. Please add it to your .env file.")

# --- LOCAL KNOWLEDGE BASE SETUP ---

# 1. Load the document content
try:
    with open("./data/prabhu_data.md", "r", encoding="utf-8") as f:
        document_text = f.read()
    
    # This is the critical fix: We split the document by the "---" separator.
    # This creates meaningful chunks based on the sections you defined.
    chunks = [p.strip() for p in document_text.split("\n---\n") if p.strip()]
    
    print(f"Knowledge base loaded successfully with {len(chunks)} semantic chunks.")
except FileNotFoundError:
    raise FileNotFoundError("prabhu_data.md not found in the 'data' directory.")

# 2. Load a local model for finding relevant text (embeddings)
# This model runs efficiently on your CPU.
print("Loading local embedding model for retrieval...")
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
print("Embedding model loaded.")

# 3. Create embeddings for each chunk of your document
print("Creating embeddings for the knowledge base...")
chunk_embeddings = embedding_model.encode(chunks)
print("Embeddings created.")


# Function to find the most relevant chunks of text
def get_relevant_context(query, top_k=2):
    query_embedding = embedding_model.encode([query])
    sim_scores = cosine_similarity(query_embedding, chunk_embeddings)[0]
    
    # Get the indices of the top_k most similar chunks
    top_k_indices = np.argsort(sim_scores)[-top_k:][::-1]
    
    # Combine the top chunks into a single context string
    context = "\n---\n".join([chunks[i] for i in top_k_indices])
    return context


# --- API SERVER (FastAPI) ---
app = FastAPI()

# CORS middleware allows your frontend website to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        user_message = request.message.lower().strip()

        # --- GUARDRAILS: For Identity and Simple Greetings ---
        # Before doing any complex work, we handle these simple cases directly for speed and accuracy.

        identity_keywords = ["who are you", "what is your name", "your name"]
        if any(keyword in user_message for keyword in identity_keywords):
            return {"reply": "My name is PRAXIS. I am a custom AI assistant created by Prabhu for his portfolio."}
        
        praxis_keywords = ["praxis means", "what is praxis", "what does praxis stand for"]
        if any(keyword in user_message for keyword in praxis_keywords):
            return {"reply": "PRAXIS stands for Prabhu's Reactive Analytical & Experiential Intelligence System."}
        
        simple_greetings = ["hi", "hello", "hlo", "hey", "what's up", "yo"]
        if user_message in simple_greetings:
            return {"reply": "Hello! How can I assist you with information about Prabhu today?"}

        # --- RAG Process: If it's not a simple question, proceed with the main logic ---

        print(f"Received query: {user_message}")
        
        # Step 1: Find relevant context from your document (runs locally)
        context = get_relevant_context(user_message)

        # Step 2: Construct a clear and direct prompt for the Gemini API
        # --- THIS IS THE EDITED SECTION FOR YOUR SPECIFIC NEED ---
        prompt = (
            "You are PRAXIS, a helpful AI assistant for Prabhu Charan's portfolio.\n"
            "Your task is to answer the user's 'Query' about Prabhu Charan based ONLY on the provided 'Context'.\n"
            "Follow these rules strictly:\n"
            "1. Speak in a natural, direct tone. Do not mention that you are referencing the context.\n"
            "2. **Always refer to the subject in the third person (e.g., 'Prabhu's GPA was...', NOT 'Your GPA was...'). This is a strict rule.**\n"
            "3. If the context does not contain the answer, you MUST say 'That's a detail Prabhu hasn't shared with me yet.'\n\n"
            f"Context: {context}\n\n"
            f"Query: {user_message}\n\n"
            "Answer:"
        )

        # Step 3: Make a single, efficient API call to Google Gemini
        api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={api_key}"
        
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": { "temperature": 0.3, "topK": 1, "topP": 1, "maxOutputTokens": 2048 }
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(api_url, json=payload, timeout=60.0)
            response.raise_for_status()

        result = response.json()
        reply = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "Sorry, I could not generate a response.")
        return {"reply": reply.strip()}
    
    except httpx.HTTPStatusError as e:
        print(f"API Error: {e.response.status_code} - {e.response.text}")
        return {"reply": "Sorry, I'm having trouble connecting to my core intelligence. This might be an API quota issue."}
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return {"reply": "Sorry, an unexpected error occurred. Please check the server logs."}

@app.get("/")
def read_root():
    return {"message": "PRAXIS AI Assistant API (Direct Gemini Version) is live."}
