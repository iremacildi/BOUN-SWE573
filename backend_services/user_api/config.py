CONFIG = {
   'postgresUrl':'host.docker.internal:5432',
   'postgresUser':'newuser',
   'postgresPass':'1234',
   'postgresDb':'postgres',
   'secretKey':'topSecret',
   'jwtAccessLifespan':{'hours': 24},
   'jwtRefreshLifespan':{'days': 30},
   'USERAPIURL':'http://localhost',
   'SERVICEAPIURL':'http://localhost:81'
}