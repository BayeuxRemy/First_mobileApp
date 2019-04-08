import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'
import Avatar from './Avatar'

class Favorites extends React.Component {

  _noFavorites() {
    if(!this.props.favoritesFilm.length > 0) {
      return ( <Text style={styles.description_text}>Vous n'avez pas encore de favoris</Text> )
    }
  }


  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Avatar/>
        </View>
        <FilmList
          films={this.props.favoritesFilm}
          navigation={this.props.navigation}
          favoriteList={true}
        />
        {this._noFavorites()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  avatar_container: {
    alignItems: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    position: 'absolute', //permet de faire passer le chargement par-dessus la FlatList
    left: 0,
    right: 0,
    top: 150,
    bottom: 0,
    textAlign: 'center',
},
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)