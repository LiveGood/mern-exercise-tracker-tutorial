import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class EditExercise extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username: props.location.exercise.username,
            description: props.location.exercise.description,
            duration: props.location.exercise.duration,
            date: new Date(props.location.exercise.date.substring(0, 10)),
            users: []
        }
    }

    // react lifeCycle method
    componentDidMount() {
        axios.get("http://localhost:5000/users")
            .then(response => {
                let users = ['test user'];
                if (response.data.length) {
                    users = response.data.map(user => user.username)
                }
                this.setState({
                    users: users
                }) 
            })
        
    }

    onChangeUsername(e) {
        // this.setState is a react method
        this.setState({
            username: e.target.value
        })
    }
    
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    
    onChangeDate(e) {
        window.testDate = e;
        console.log(window.testDate);
        this.setState({
            date: e
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);
        console.log(this.props.match.params.id);
        axios.put('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => console.log(res));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className='form-control'
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(user => <option key={user} value={user}>{user}</option>)
                        }

                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>

                    <div className="form-group">
                        <label>Duration (in minutes)</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        )
    }
}