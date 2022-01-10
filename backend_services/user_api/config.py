CONFIG = {
   'postgresUrl':${{ secrets.POSTGRESURL }},
   'postgresUser':${{ secrets.POSTGRESUSER }},
   'postgresPass':${{ secrets.POSTGRESPASS }},
   'postgresDb':${{ secrets.POSTGRESDB }},
   'secretKey':'topSecret',
   'jwtAccessLifespan':{'hours': 24},
   'jwtRefreshLifespan':{'days': 30}
}
