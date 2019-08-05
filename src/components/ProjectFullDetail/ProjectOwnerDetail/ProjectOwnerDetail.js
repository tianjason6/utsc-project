import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../../store/actions/user';

class ProjectOwnerDetail extends Component{
    constructor(props) {
        super(props);

        this.state = {
            owner: this.props.owner,
            userData: null,
            Loading: "Loading..."
        }
    };
    componentDidUpdate() {
        //this.props.getUser(this.props.project.title);
        console.log("component did mount");
        console.log('1: '+this.props.owner);
        console.log(this.state.userData);
        console.log(this.props.user);
        if((this.state.userData === null || this.state.userData === undefined) && this.props.user === undefined) {
        //if(this.state.userData === null) {
        //if(this.props.user === undefined) {
            this.setState({userData: this.props.getUser(this.props.owner)} );
        }
        
        //this.props.getUser(this.props.owner);
        console.log("after getUser");
        console.log("3: " + this.props.user);
        console.log(this.props.user);
        console.log("69" + this.state.userData);
    }
    // componentDidUpdate() {
    //     axios.get('Users/' + this.props.owner + '.json')
    //     .then(res => this.setState({userData: res.data}));
    // }
    render() {
        console.log("component did mount");
        console.log('4: '+this.props.owner);
        console.log("after getUser");
        console.log("5: " +this.props.user);
        console.log("420: " + this.state.userData);
        console.log(this.state.userData);



        let ownerDetails = (<div>Loading...</div>);
        // if(this.props.user){
        //     ownerDetails = (
        //         <div>{this.props.user}</div>
        //     )
        // }

        return(
            <div>
                <div>ProjectOwnerDetail</div>
                <div>{ this.props.owner }</div>
                <div>{ ownerDetails }</div>
                <div>refresh test</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.userReducer.user
    };
}
const mapDispatchToProps = dispatch => {
    console.log("map to dispatch to props");
    return{
        getUser: (username) => dispatch(userActions.fetchUser(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOwnerDetail);