from data.user_repository import UserRepository
from app import ma

class UserModel(ma.Schema):    
    class Meta:
        model = UserRepository
        fields = ('id', 'name', 'surname', 'username', 'about', 'email', 'phonenumber', 'profilepictureurl', 'hashedpassword', 'timecredit', 'timecreditonhold', 'isactive')

user_model = UserModel()