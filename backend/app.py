from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from db import db

from security import authenticate, identity
from resources.user import UserRegister
from resources.Task import Task, TaskList
from resources.project import Project

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'Ricco'
api = Api(app)
CORS(app)


@app.before_first_request
def create_tables():
    db.create_all()


api.add_resource(Task, '/Task/<string:title>')
api.add_resource(TaskList, '/Tasks')
api.add_resource(UserRegister, '/register')
api.add_resource(Project, '/Project/<string:name>')

if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)
