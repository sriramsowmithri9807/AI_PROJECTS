from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from app.chatbot.engine import chatbot

main_bp = Blueprint('main', __name__, template_folder='templates')
chatbot = ChatbotEngine()

@main_bp.route('/')
def index():
    return render_template('index.html')

@main_bp.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', " ")
    session_id = data.get('session_id', 'default-session')


    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    try:
        response = chatbot.process_message(user_message, session_id)
        return jsonify({
            'response': response,
            'success':True
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
            }), 500

@main_bp.route('/api/rest', methods=['POST'])
def reset_conversation():
    data = request.json
    session_id = data.get('session_id', 'default-session')

    try:
        chatbot.reset_conversation(session_id)
        return jsonify({
            'message':'Conversation history reset successfully',
            'success': True
            })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
            }), 500
