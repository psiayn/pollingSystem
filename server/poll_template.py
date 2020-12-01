from server import db

class Entry(db.Model):
    """
    ORM Class that extends db.Model.
    Parameters:
        uid: Type Integer, randomly generated 6 digit uid, Primary Key
        name: Type String
        vote: Type Boolean
        date: Type Date
    Displayed as:
        <Entry uid>
    """
    uid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    vote = db.Column(db.Boolean, nullable=False)
    date = db.Column(db.Date, nullable=False)
    
    def __repr__(self):
        return '<Entry %r>' % self.uid
