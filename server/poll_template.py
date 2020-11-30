from server import db

class Entry(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    vote = db.Column(db.Boolean, nullable=False)
    date = db.Column(db.Date, nullable=False)
    
    def __repr__(self):
        return '<Entry %r>' % self.uid
