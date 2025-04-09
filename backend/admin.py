from flask_admin.contrib.pymongo import ModelView
from extensions import admin, mongo

def init_admin(app):
    admin.init_app(app)
    admin.add_view(ModelView(mongo.db.exoplanets, name='Exoplanets'))
    admin.add_view(ModelView(mongo.db.users, name='Users'))