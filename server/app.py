from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from server import app, db
from server.poll_template import Entry
from random import randint
from datetime import datetime

@app.route("/vote", methods=["POST"])
def vote():
    poll = request.get_json()
    poll["date"], _ = poll["date"].split('T')
    poll["date"] = datetime.strptime(poll["date"], "%Y-%m-%d").date()
    new_poll = Entry(
        uid=randint(100000, 1000000), name=poll["name"], vote=poll["vote"], date=poll["date"]
    )
    
    db.session.add(new_poll)
    db.session.commit()

    print(new_poll.uid, new_poll.name, new_poll.vote, new_poll.date)
    return "YES", 201


@app.route("/data")
def data():

    data_all = Entry.query.all()
    
    data = []

    for d in data_all:
        data.append({'uid': d.uid, 'name': d.name,'vote': d.vote,'date': d.date})
    
    print(jsonify(data))

    return jsonify({"polls" : data})


if __name__ == "__main__":
    app.run(debug=True)
