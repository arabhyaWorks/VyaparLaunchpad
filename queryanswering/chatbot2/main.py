from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss

app = FastAPI()

# Load pre-trained model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Load precomputed vectors (make sure to replace with your actual vectors file)
question_vectors = np.load('question_vectors.npy')

# Create FAISS index
d = question_vectors.shape[1]
index = faiss.IndexFlatL2(d)
index.add(question_vectors)

# Synonym normalization function
def normalize_query(query: str) -> str:
    synonyms = {
        "mandir": "temple",
        # Add more synonyms as needed
    }
    for word, replacement in synonyms.items():
        query = query.replace(word, replacement)
    return query

# Search vectors function
def search_vectors(query: str, model: SentenceTransformer, index, k=1):
    query_vector = model.encode([query])
    D, I = index.search(query_vector, k)
    similarity_percentage = (1 - D[0][0]) * 100  # Convert distance to similarity percentage
    return I[0], similarity_percentage

# Request body model
class QueryRequest(BaseModel):
    question: str

# Endpoint to process queries
@app.post("/ask")
def ask_question(request: QueryRequest):
    normalized_question = normalize_query(request.question)
    result_indices, similarity_percentage = search_vectors(normalized_question, model, index, k=1)
    if similarity_percentage >= 40:
        answer = "Your answer here"  # Replace with your logic to fetch an answer
    else:
        answer = "I don't have information on that."
    return {"answer": answer, "similarity_percentage": similarity_percentage}
