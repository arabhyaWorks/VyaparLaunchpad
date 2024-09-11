from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from elasticsearch import Elasticsearch
from openai import OpenAI

# Hardcoded OpenAI API Key
OPENAI_API_KEY = "sk-proj-4wlO7ligvAsag0aRaUT3T3BlbkFJgry32XWmMkBTDwtDz3dT"
client = OpenAI(api_key=OPENAI_API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Elasticsearch client configuration
es_client = Elasticsearch(
    "https://9b18ea9679144d11a8ac5c9a63682531.us-east-1.aws.found.io:443",
    api_key="SW53SElaRUJtb3NaSmRVWF9UdFk6UUlYc1ZsZUhTYzZUc2FqTllwdm9sQQ=="
)

# Index source fields
index_source_fields = {
    "asknandi_index": [
        "text"
    ]
}

class QueryRequest(BaseModel):
    question: str

def get_elasticsearch_results(query: str):
    es_query = {
        "query": {
            "multi_match": {
                "query": query,
                "fields": [
                    "text"
                ],
                "fuzziness": "AUTO"
            }
        },
        "size": 5
    }
    result = es_client.search(index="asknandi_index", body=es_query)
    return result["hits"]["hits"]

def create_openai_prompt(question: str, results: list):
    context = ""
    for hit in results:
        source_field = index_source_fields.get(hit["_index"])[0]
        hit_context = hit["_source"][source_field]
        context += f"{hit_context}\n"
    
    prompt = f"""
    Instructions:
    
    - understand the question and be very specific about the input.
        - Be as polite as possible and do not use any vulgar or sharp words.
    - if you think the question and answer is not correct please return with "I am really sorry but I cant help you with that please visit www.shrikashivish>
    - also like the context might be talking about things that are not related to the question but match couple things.www.shrikashivishwanath.org
        - When asked about temple timings : "answer": "The temple opens at 2:30 AM and the closing time of the temple is 11:00 PM."
    - Do not respond with any mobile phone number if asked about contact or any phone number do not respond  with  any type of phone number

    for example:

    the input query might ask : what is something ?
    the context will have some information about like timings or some other details not related to the question you can ommit it and respond with "I am real>

    understand the question in depth
    - Answer questions truthfully and factually using only the information presented.
    - If you don't know the answer, just say that you don't know, don't make up an answer!
    - You must always cite the document where the answer was extracted using inline academic citation style [], using the position.
    - Use markdown format for code examples.
    - You are correct, factual, precise, and reliable.
        {context}

    Question: {question}
    Answer:
    """
    return prompt

def generate_openai_completion(user_prompt: str):
    response = client.chat.completions.create(model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are an assistant for question-answering tasks."},
        {"role": "user", "content": user_prompt},
    ])
    return response.choices[0].message.content

@app.post("/ask")
async def ask_question(query_request: QueryRequest):
    question = query_request.question
    elasticsearch_results = get_elasticsearch_results(question)
    if not elasticsearch_results:
        raise HTTPException(status_code=404, detail="No results found in Elasticsearch")

    context_prompt = create_openai_prompt(question, elasticsearch_results)
    openai_completion = generate_openai_completion(context_prompt)
    return {"answer": openai_completion}

@app.get("/health")
async def health_check():
    return {"status": "ok"}