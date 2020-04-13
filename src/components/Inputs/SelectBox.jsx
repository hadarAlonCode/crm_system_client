import React, { Component } from "react";

class SelectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_val: "",
            selected: true,
            options: []
        }
    }

    componentDidMount() {
        const { options, state_value } = this.props;
        this.setState({
            options: options,
            selected_val: state_value
        })

        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    setWrapperRef = node => {
        this.wrapperRef = node;
    };


    handleClickOutside = event => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.closeSelectedBox();
        }
    };

    

    toggle = () => {
        const { selected } = this.state;

        this.setState({
            selected: !selected
        });

    };

    closeSelectedBox = () => {
        this.setState({
            selected: true
        });
    };

    selectOption = option => {
        const { updateForm, state_name } = this.props;

        if (option === "Clear Select") {
            updateForm(state_name, "");
            this.setState({
                selected_val: ""
            })

        } else {
            updateForm(state_name, option);

            if(state_name === "contact"){
            this.setState({
                selected_val: option.name
            })
            }else{
                this.setState({
                    selected_val: option
                })
            }

        }

        this.toggle();

    };


    handleChange = (e) => {
        const { selected } = this.state;

        let value = e.target.value
        this.match(value)

        if (selected) {
            this.setState({
                selected: false
            });
        }

        this.setState({
            selected_val: value
        })


    }


    match = (s) => {
        const { options, state_name } = this.props;

        let char = s.toLowerCase()

        const p = Array.from(char).reduce((a, v, i) => `${a}[^${char.substr(i)}]*?${v}`, '');
        const re = RegExp(p);
        let new_options
        if(state_name === "contact"){
            new_options = options.filter(v => v.name.toLowerCase().match(re));
        }else{
            new_options = options.filter(v => v.toLowerCase().match(re));

        }


        this.setState({
            options: new_options
        })

    };



    render() {
        const { selected, selected_val, options } = this.state;
        const { state_value, state_name, title_text, placeholder } = this.props

        return (
            <div className="select__box__container" ref={this.setWrapperRef}>
                <h3>{title_text}</h3>
                <section className="selected__box" >
                    <header onClick={this.toggle} className="header__select">

                        {
                            state_name === "country" || state_name === "contact"  ? 

                                <input type="text"
                                    value={selected_val ? selected_val : ""}
                                    onChange={(e) => this.handleChange(e)}
                                    placeholder={placeholder? placeholder : null}

                                ></input>


                                : <aside>{state_value ? state_value : ""}</aside>


                        }


                        <span className="select__box__icon">
                            {selected ? (
                                <i className="fas fa-sort-down"></i>
                            ) : (
                                    <i className="fas fa-sort-up"></i>
                                )}
                        </span>
                    </header>

                    <ul
                        id={selected ? "selected__box--off" : "selected__box--active"}
                        className="selectbox__list"
                    >
                        {options.map((option, index) => {
                            return (
                                <li
                                    className="selectbox__option"
                                    onClick={() => this.selectOption(option)}
                                    key={index}
                                >
                                    <span>{state_name === "contact" ? option.name : option}</span>
                                </li>
                            );
                        })}
                    </ul>


                </section>
            </div>
        );
    }
}

export default SelectBox;
