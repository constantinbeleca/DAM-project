from flask_restful import Resource, reqparse
from models.TaskModelS import TaskModel


class Task(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('Description',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('State',
                        type=int,
                        required=True,
                        help="This field should be 1 for new task,2 for in working,3 for done !"

                        )
    parser.add_argument('Puniquecode',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    def get(self, title):
        task = TaskModel.find_by_title(title)
        if task :
            return task.json()
        return {'message': 'Task not found'}, 404

    def post(self, title):
        if TaskModel.find_by_title(title):
            return {'message': "An task with Title '{}' already exists.".format(title)}, 400

        data = Task.parser.parse_args()

        task = TaskModel(title, data['Description'],data['State'],data['Puniquecode'])

        try:
            task.save_to_db()
        except:
            return {"message": "An error occurred inserting the task."}, 500

        return task.json(), 201

    def delete(self, title):
        task = TaskModel.find_by_title(title)
        if task:
            task.delete_from_db()
            return {'message': 'Task deleted.'}
        return {'message': 'Task not found.'}, 404

    def put(self, title):
        data = Task.parser.parse_args()

        task = TaskModel.find_by_title(title)

        if task:
            task.Description = data['Description']
            task.State = data['State']
        else:
            task = TaskModel(title, data['Description'],data['State'])

        task.save_to_db()

        return task.json()


class TaskList(Resource):
    def get(self):
        return {'Tasks': [task.json() for task in TaskModel.query.all()]}
