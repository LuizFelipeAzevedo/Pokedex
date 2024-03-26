import { View, Text, StyleSheet, Image } from 'react-native';
import pokedex from '../../assets/pokedex.json'
import { addPokemon } from '../../reducers/pokemonSlice';
import { removePokemon } from '../../reducers/pokemonSlice'; 
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-web';
import { useSelector } from 'react-redux';


const PokemonScreen = ({ route }) => {
  console.log('route: ', route)
  const id = route.params.id
  const idString = id.toString().padStart(3, '0');
  const imageSrc = require(`../../assets/images/${idString}.png`)
  const dispatch = useDispatch();

  const myPokemons = useSelector(state => state.trainer.pokemons)
  const hasPokemon = myPokemons.includes(id)

  const onPress = () => {
    if (hasPokemon){
      dispatch(removePokemon(id))
    } else {
      dispatch(addPokemon(id))
    }
  }

  const pokemonInfo = pokedex[id -1];

    return (
        // Adicionar imagem, tipos e status para o pokémon do id escolhido
      <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'space-around', marginTop: '30px' }}>
        <View style={styles.imgContainer}>
          <Image source={imageSrc} style={styles.image}/>
        </View>
        <Text style={styles.name}>
          {pokemonInfo.name.english}
        </Text>
        <View style={styles.types}>
          {pokemonInfo.type.map(type => (
            <Text style={{borderWidth: 1, borderColor: 1}}> {type} </Text>
          ))}
        </View>
        <View style={styles.att}>
          {Object.keys(pokemonInfo.base).map(att => (
            <View style={{width: '50%'}}>
              <Text > {`${att}:  ${pokemonInfo.base[att]}`} </Text>
            </View>
          ))}
        </View>
        <Button
        title = { hasPokemon ? "Remove" : "Add" }
        onPress = {onPress}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    image: {
        flex: 1,
        aspectRatio: 1,
    },
    imgContainer: {
      width: '60%',
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: '#333',
      padding: 10,
    },
    name: {
      fontSize: '23px',
      fontWeight: 'bold'
    },
    types: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: '30px'
    },
    att: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignContent: 'flex-start',
      width: '80%',
      flexWrap: 'wrap',
      alignItem: 'flex-start',
      padding: '16px',
      borderWidth: 2,
      borderColor: '#000'
    }

})

export default PokemonScreen;