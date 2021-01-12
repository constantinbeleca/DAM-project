from db import db

class ProjectModel(db.Model):
	__tablename__ = 'Projects'
	 
	uniquecode = db.Column(db.String(20) ,primary_key=True)
	name = db.Column(db.String(80))
	

	tasks = db.relationship('TaskModel',lazy='dynamic')

	def __init__(self, name, uniquecode):
		self.name = name
		self.uniquecode = uniquecode

	@classmethod
	def find_by_code(cls, unq_code):
		return cls.query.filter_by(uniquecode= unq_code).first()

	@classmethod
	def find_by_name(cls, name):
		return cls.query.filter_by(name=name).first()

	def json(self):
		new_task=[]
		in_working=[]
		done=[]
		for task in self.tasks.all():
			if task.State == 1:
				new_task.append(task)
			elif task.State == 2:
				in_working.append(task)
			else:
				done.append(task)

		return {'name':self.name,'new_task':[tsk.json() for tsk in new_task], 'in_working': [tsk.json() for tsk in in_working], 'done': [tsk.json() for tsk in done]}

	def save_to_db(self):
		db.session.add(self)
		db.session.commit()

	def delete_to_db(self):
		db.session.delete(self)
		db.session.commit()