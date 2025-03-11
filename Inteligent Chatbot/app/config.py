import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
    PINECONE_ENV = os.environ.get('PINECONE_ENV')
    MODEL_NAME = 'gpt-3.5-turbo'
    TEMPERATURE = 0.7
    MAX_TOKENS = 150
    CONVERSATION_MEMORY_K = 10  