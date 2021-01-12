from db import db


class TaskModel(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    Title = db.Column(db.String(80))
    Description = db.Column(db.String(300))
    State = db.Column(db.Integer)

    Puniquecode = db.Column(db.String(20),db.ForeignKey('Projects.uniquecode'))
    project = db.relationship('ProjectModel')

    def __init__(self, title, description, state, puniquecode):
        self.Title = title
        self.Description = description
        self.State = state
        self.Puniquecode= puniquecode

    def json(self):
        _id = self.query.filter_by(Title=self.Title).first().id
        print(_id)
        return {'ID': _id ,'Title': self.Title, 'Description': self.Description, 'State': self.State}
    

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
    


    @classmethod
    def find_by_title(cls, title):
        return cls.query.filter_by(Title=title).first()


