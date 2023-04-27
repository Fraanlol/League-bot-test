First check if the player's in game 
    If the player is in game
        Gather LP and if the PL equals 100, gather promo data
            Instead of saving current lp save promo status. ( Wins and loses )

    Maybe an object { Promo : false/true , data{
        lp: x,
        promo-wins:x,
        promo-loses:x
        }
    }

    then do: 
     
     If the player won {
        if(player.promo){
            // Logic to know if he won the promo or just won 1 game, like
            if(player.data.promo-wins == 2){
                Contrats!! You won the promo
            }else{
                You won 1/2 games of the promo
            }
        }else{
            You won x amount of LP.
        }
     } else{
         if(player.promo){
            // Logic to know if he lost the promo or just lost 1 game, like
            if(player.data.promo-loses == 2){
                So bad you lost your promotion
            }else{
                You won 1/2 games of the promo
            }
        }else{
            You've lost x amount of LP.
        }
     }