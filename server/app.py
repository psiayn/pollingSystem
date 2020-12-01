from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from server import app, db
from server.poll_template import Entry
from random import randint
from datetime import datetime
from sqlalchemy import func
import sqlite3


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

@app.route("/graphs")
def graphs():
    conn = sqlite3.connect('polls.db')
    cur = conn.cursor()
    
    lineQuery = """select date, sum(cnt_success), sum(cnt_failure) from (
        select date, vote, 
            case when vote =1 then count(uid) else 0 end as cnt_success, 
            case when vote = 0 then count(uid) else 0 end as cnt_failure
        from entry
        group by vote, date) as A 
    group by date"""
    cur.execute(lineQuery)
    lineData = []
    for d in cur.fetchall():
        if (d[1] == 0):
            lineData.append({'date': d[0], 'no': d[2]})
        elif (d[2] == 0):
            lineData.append({'date': d[0], 'yes': d[1]})
        else:
            lineData.append({'date': d[0], 'yes': d[1], 'no': d[2]})


    cur.execute("""
        select vote, count(uid) as cnt
        from entry
        group by vote
    """)

    barData = []
    for d in cur.fetchall():
        if (d[0] == 1):
            barData.append({'vote': 'yes', 'count': d[1]})
        if (d[0] == 0):
            barData.append({'vote': 'no', 'count': d[1]})

    return jsonify({'line': lineData, 'bar': barData}) 

if __name__ == "__main__":
    app.run(debug=True)
