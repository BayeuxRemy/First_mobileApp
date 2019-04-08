import React from 'react'
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import News from '../Components/News'
import Test from '../Notification/Test'
import { Ionicons } from '@expo/vector-icons';

const SearchStackNavigator = createStackNavigator({
  Search: { // Nom utilisé pour appeler cette vue (peut être différente)
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: { // nom utilisé pour cette vue 
    screen: FilmDetail
  }
})

const FavoritesStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const NewsStackNavigator = createStackNavigator({
  News: {
    screen: News,
    navigationOptions: {
      title: 'Les Derniers Films',
    },
  },
  FilmDetail: {
    screen: FilmDetail,
  }
})

const NotificationStackNavigator = createStackNavigator({
  Notification: { // Nom utilisé pour appeler cette vue (peut être différente)
    screen: Test,
    navigationOptions: {
      title: 'Notification'
    }
  }
})

const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
        return <Image
          source={require('../assets/ic_search.png')}
          style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
      }
    }
  },
  Favorites: {
    screen: FavoritesStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../assets/ic_favorite.png')}
          style={styles.icon}/>
        }
      }
    },
    News: {
      screen: NewsStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/ic_fiber_new.png')}
            style={styles.icon}/>
        }
      }
    },
    Notification: {
      screen: NotificationStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Ionicons name="md-notifications" size={30} color="black" />
        }
      }
    }
  },
{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
    inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
    showLabel: false, // On masque les titres
    showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
  }
})

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(MoviesTabNavigator)