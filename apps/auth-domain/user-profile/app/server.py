import grpc
from concurrent import futures
import time

from app import models
from app import database
from app.database import SessionLocal
import proto.user_profile_pb2 as pb2
import proto.user_profile_pb2_grpc as pb2_grpc

class UserProfileService(pb2_grpc.UserProfileServiceServicer):
    def GetProfile(self, request, context):
        db = SessionLocal()
        user = db.query(models.User).filter(models.User.id == request.id).first()
        if not user:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details("User not found")
            return pb2.UserProfile()
        return pb2.UserProfile(
            id=user.id,
            email=user.email,
            name=user.name or "",
            phone=user.phone or "",
            city=user.city or "",
            address=user.address or "",
            birthdate=user.birthdate or "",
            gender=user.gender or ""
        )

    def UpdateProfile(self, request, context):
        db = SessionLocal()
        user = db.query(models.User).filter(models.User.id == request.id).first()
        if not user:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details("User not found")
            return pb2.UserProfile()
        user.name = request.name
        user.phone = request.phone
        user.city = request.city
        user.address = request.address
        user.birthdate = request.birthdate
        user.gender = request.gender
        db.commit()
        return pb2.UserProfile(
            id=user.id,
            email=user.email,
            name=user.name,
            phone=user.phone,
            city=user.city,
            address=user.address,
            birthdate=user.birthdate,
            gender=user.gender
        )

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_UserProfileServiceServicer_to_server(UserProfileService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("gRPC server started on port 50051")
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serve()
