import os 
from langchain.chat_modules import ChatModule
from langchain.chains import ConversationChain
from app.chatbot.memory import EnhancedConversationMemory
from app.chatbot.prompt_templates import get_chatbot_prompt
from app.chatbot.utils import preprocess_message, postprocess_response 
from app.config import Config

# Placeholder function to demonstrate functionality
def run_chatbot():
    print("Chatbot is running with the following configuration:")
    print(f"Model Name: {Config.MODEL_NAME}")
