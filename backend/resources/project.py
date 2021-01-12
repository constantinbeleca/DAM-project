from flask_restful import Resource, reqparse
from models.project import ProjectModel


class Project(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('uniquecode',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )

    def get(self, name):
        project = ProjectModel.find_by_code(name)
        if project:
            return project.json()
        return {'message': 'Project not found'}, 404

    def post(self, name):
        if ProjectModel.find_by_name(name):
            return {'message': 'A project with this name already exists.'}, 400

        data = Project.parser.parse_args()
        uniquecode = data['uniquecode']
        print(uniquecode)

        project = ProjectModel(name, uniquecode)
        try:
            project.save_to_db()
        except:
            return {'message': 'An error occured while creating the project.'}, 500

        return project.json(), 201

    def delete(self, name):
        project = ProjectModel.find_by_name(name)
        if project:
            project.delete_from_db()
