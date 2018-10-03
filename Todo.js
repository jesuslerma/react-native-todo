import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

export class Todo extends Component {
  constructor () {
    super()
    this.state = {
      todos: [],
      newTodo: ''
    }
  }

  async componentWillMount () {
    // the ip value will change
    const response = await fetch('http://192.168.15.8:3011/todos')
    const todos = await response.json()
    this.setState({todos})
  }

  handleChange (text) {
    this.setState({newTodo: text})
  }

  async handlePress () {
    const newTodo = {
      name: this.state.newTodo
    }
    // the ip value will change
    await fetch('http://192.168.15.8:3011/todos', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
    const todos = [...this.state.todos, newTodo]
    this.setState({todos, newTodo: ''})
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={this.state.newTodo}
            onChangeText={this.handleChange.bind(this)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.handlePress.bind(this)}
          >
            <Text style={styles.buttonText}>make</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.todos}>
          {this.state.todos.map((todo, i) => (
            <View key={i} style={styles.todo}>
              <Text style={styles.todoText}>{todo.name}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  form: {
    flexDirection: 'row'
  },

  input: {
    flex: 0.7,
    fontSize: 24
  },

  button: {
    flex: 0.3,
    borderWidth: 1,
    height: 50,
    borderColor: 'blue',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  todos: {
    marginTop: 60
  },

  todo: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },

  todoText: {
    fontSize: 24
  }
})
