const ComparePokemon = {

    compare: function(pokemon1, pokemon2) {
        let score1 = 0;
        let score2 = 0;
    
        let luck1 = getRandomInt((pokemon1.base.Attack + pokemon1.base.Defense + pokemon1.base.HP + pokemon1.base.Speed + pokemon2.base.Attack + pokemon2.base.Defense + pokemon2.base.HP + pokemon2.base.Speed) / 5)
        console.log(luck1)
        let luck2 = getRandomInt((pokemon2.base.Attack + pokemon2.base.Defense + pokemon2.base.HP + pokemon2.base.Speed +pokemon1.base.Attack + pokemon1.base.Defense + pokemon1.base.HP + pokemon1.base.Speed) / 5)
        console.log(luck2)
       
        if (pokemon1.base.HP+luck1 > pokemon2.base.HP+luck2) score1++;
        if (pokemon1.base.Attack+luck1 > pokemon2.base.Attack+luck2) score1++;
        if (pokemon1.base.Defense+luck1 > pokemon2.base.Defense+luck2) score1++;
        if (pokemon1.base.Speed+luck1 > pokemon2.base.Speed+luck2) score1++;
    
        if (pokemon2.base.HP+luck2 > pokemon1.base.HP+luck1) score2++;
        if (pokemon2.base.Attack+luck2 > pokemon1.base.Attack+luck1) score2++;
        if (pokemon2.base.Defense+luck2 > pokemon1.base.Defense+luck1) score2++;
        if (pokemon2.base.Speed+luck2 > pokemon1.base.Speed+luck1) score2++;
       
    
        console.log("Result: ", score1 ," vs " , score2)
    
        if (score1 > score2) {
          return 0;
        } else if (score2 > score1) {
          return 1;
        } else {
            const luckyWinner = getRandomInt(2)
            if(luckyWinner == 0)
            {
                return 0;
            }
            else
            {
                return 1;
            }
    
          return null; // Unentschieden
        }
       },
    




}
function getRandomInt (max)
{
     return Math.floor(Math.random()* max)
}


export default ComparePokemon