from random import randint

n = randint(0, 100)

counter = 0
entered_before = []

while(True):
    # Input
    try:
        player_n = int(input('Guess the number: '))
    except:
        print('Not allowed you must enter an integer number...')
        continue
    
    # Check the range
    if player_n not in range(100):
        print('Not allowed must be between 0 and 100...')
        continue
    
    # Check if entered before
    if player_n in entered_before:
        print('You have entered this number before...') 
        continue
    
    # Compare the numbers
    if player_n > n:
        print(f'Smaller than {player_n}')
        entered_before.append(player_n)
    elif player_n < n:
        print(f'Bigger than {player_n}')
        entered_before.append(player_n)
    else:
        print('Right!, you made it :)')
        winner = True
        break
    
    # prepare for the next round 
    counter += 1

    # the losing end of the game and offer to play again
    if counter > 10:
        print('Sorry, you will get it the next time')
        answer = input('Do you wanne play again? (y/n)\n')
        if answer.lower() in ['y', 'yes']:
            counter = 0
            entered_before = []
            continue 
        else:
            break      