import uuid

class Node:
    def __init__(self, question):
        self.id = uuid.uuid4()
        self.question = question
        self.yes = None
        self.no = None

class Tree:
    def __init__(self):
        self.root = Node("Is the device powered on?")
        self.current = self.root

    def get_current(self):
        return self.current

    def answer(self, answer):
        if answer == 'yes':
            if not self.current.yes:
                self.current.yes = Node("Problem solved.")
            self.current = self.current.yes
        elif answer == 'no':
            if not self.current.no:
                self.current.no = Node("Problem solved.")
            self.current = self.current.no

    def add_question(self, question, yes_answer, no_answer):
        if self.current.question == "Problem solved.":
            self.current.question = question
            self.current.yes = Node(yes_answer)
            self.current.no = Node(no_answer)
        else:
            raise ValueError("You can only add questions to a solved node.")

