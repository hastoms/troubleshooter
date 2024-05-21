from flask import Flask, request, jsonify
from models import Tree, Node

app = Flask(__name__)
tree = Tree()

@app.route('/current', methods=['GET'])
def get_current_node():
    current_node = tree.get_current()
    return jsonify({'id': current_node.id, 'question': current_node.question})

@app.route('/answer', methods=['POST'])
def answer_question():
    data = request.json
    answer = data.get('answer')
    tree.answer(answer)
    return jsonify({'message': 'Answered', 'current': tree.get_current().question})

@app.route('/add_question', methods=['POST'])
def add_question():
    data = request.json
    question = data.get('question')
    yes_answer = data.get('yes_answer')
    no_answer = data.get('no_answer')
    tree.add_question(question, yes_answer, no_answer)
    return jsonify({'message': 'Question added'})

if __name__ == '__main__':
    app.run(debug=True)

