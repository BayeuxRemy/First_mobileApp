import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { Permissions, Notifications } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      notification: null,
      title: 'Hello World',
      body: 'Say something!',
    };
  }

  async registerForPushNotifications() {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }

    const token = await Notifications.getExpoPushTokenAsync();

    this.subscription = Notifications.addListener(this.handleNotification);

    this.setState({
      token,
    });
  }

  /*sendPushNotification(token = this.state.token, title = this.state.title, body = this.state.body) {
    return fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        data: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

      
}*/

  sendPushNotification(title = this.state.title, body = this.state.body) {
    const localNotification = { 
      title: title,
      body: body
    }
    const schedulingOptions = {
      time: (new Date()).getTime() + 10000
   }
    //Planifiez une notification locale pour qu'elle se déclenche à un moment donné dans le futur ou à un intervalle donné.
    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
  }


  handleNotification = notification => {
    this.setState({
      notification,
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <Text style={styles.title}>Envoie d'une notification</Text>
        <Text style={styles.text}>Titre</Text>
        <TextInput
          style={styles.input}
          onChangeText={title => this.setState({ title })}
          maxLength={100}
          value={this.state.title}
        />
        <Text style={styles.text}>Message</Text>
        <TextInput
          style={styles.input}
          onChangeText={body => this.setState({ body })}
          maxLength={100}
          value={this.state.body}
        />
            <TouchableOpacity
            onPress={() => this.registerForPushNotifications()}
            style={styles.touchable}>
            <Text style={styles.white}>Enregistrer la notification</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.sendPushNotification()} style={styles.touchable}>
            <Text style={styles.white}>Envoyer la notification</Text>
            </TouchableOpacity>
        {this.state.token ? (
          <View>
            <Text style={styles.text}>Token</Text>
            <TextInput
              style={styles.input}
              onChangeText={token => this.setState({ token })}
              value={this.state.token}
            />
          </View>
        ) : null}
        {this.state.notification ? (
          <View>
            <Text style={styles.text}>Last Notification:</Text>
            <Text style={styles.text}>{JSON.stringify(this.state.notification.data.message)}</Text>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    padding: 8,
    textAlign: 'center'
  },
  text: {
    paddingBottom: 2,
    padding: 8,
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
  touchable: {
    borderWidth: 1,
    borderRadius: 4,
    margin: 8,
    padding: 8,
    width: '95%',
    backgroundColor : '#999999',
  },
  white: {
    color:'#ffffff',
    fontWeight:'bold',
    textAlign:'center'
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 8,
    padding: 8,
    width: '95%',
  },
});


/*export default class Timer extends Component {
    onSubmit(e) {
        Keyboard.dismiss();

        const localNotification = {
            title: 'done',
            body: 'done!'
        };

        const schedulingOptions = {
            time: (new Date()).getTime() + Number(e.nativeEvent.text)
        }

        // Notifications show only when app is not active.
        // (ie. another app being used or device's screen is locked)
        Notifications.scheduleLocalNotificationAsync(
            localNotification, schedulingOptions
        );
    }

    handleNotification() {
        console.warn('ok! got your notif');
    }

    async componentDidMount() {
        // We need to ask for Notification permissions for ios devices
        let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (Constants.isDevice && result.status === 'granted') {
            console.log('Notification permissions granted.')
        }

        // If we want to do something with the notification when the app
        // is active, we need to listen to notification events and 
        // handle them in a callback
        Notifications.addListener(this.handleNotification);
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TextInput
                    onSubmitEditing={this.onSubmit}
                    placeholder={'time in ms'}
                />
            </View>
        );
    }
};*/