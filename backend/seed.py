from app.core.database import Base, engine
from app.db_seed import seed_database


def run():
    Base.metadata.create_all(bind=engine)
    seed_database()


if __name__ == "__main__":
    run()
