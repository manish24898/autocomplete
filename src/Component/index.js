import React, {useEffect, useState} from "react";
import logo from '../logo.svg';
import '../App.css';
import "./styles.scss";
import {connect} from "react-redux";
import * as actions from "../Store/Action/Users";

/**
 * AutoDropdown
 * @param props
 * @returns {*}
 * @constructor
 */
const AutoDropdown = props => {
    const [usernameSuggestions, setUsernameSuggestions] = useState([]);
    const [input, setInput] = useState("");
    const {fetchUsers, data: {users, error}} = props;
    if (error) console.log(error);

    /**
     * Fetch users
     */
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    /**
     * Set autocomplete value to input box
     * @param name
     */
    const autoCompleteValue = name => {
        setInput(name);
        setUsernameSuggestions([]);
    };

    /**
     * On text change to grab the list of matches substring
     * @param e
     */
    const onTextChange = e => {
        let value = e.target.value.toLowerCase();
        setInput(value);

        if (value.length > 0) {
            let searchResults = [];

            for (let index = 0; index < users.length; index++) {
                let name = users[index].name.toLocaleLowerCase();
                if (name.includes(value)) {
                    searchResults.push(users[index]);
                }
            }

            setUsernameSuggestions(
                searchResults.map((user, index) => {
                    let firstCharacter = user.name.substr(0, value.length);
                    let name = user.name;
                    name = name.replace(firstCharacter, "");

                    return (
                        <div
                            onClick={() => autoCompleteValue(searchResults[index].name)}
                            key={index}
                            id={index}
                        >
                            <strong>
                                {firstCharacter}
                            </strong>
                            {name}
                            <input type="hidden" value={name}/>
                        </div>
                    )
                })
            );
        } else setUsernameSuggestions([]);
    };

    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1>Auto Complete</h1>

            <form autoComplete="off">
                <div className="autocomplete">
                    <input
                        id="myInput"
                        type="text"
                        name="username"
                        placeholder="Enter user name"
                        onChange={onTextChange}
                        value={input}
                        style={{width: "300px"}}
                    />
                    <input type="submit"/>
                </div>
                <div className="autocomplete-items">
                    {usernameSuggestions}
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        data: state.users,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: async () => await dispatch(actions.fetchUsers())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AutoDropdown);
