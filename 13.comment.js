let Board = React.createClass({
    getInitialState(){
        return {ary:[],
            ulData:''};

    },
    keyDownClick(){

        this.state.ary.push(this.refs.ulData.value);
        this.setState({ary: this.state.ary});
        //console.log(this.refs.ulData.value,this.state.ary)
        this.refs.ulData.value='';

    },
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>珠峰留言版</h1>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {
                            this.state.ary.map(function (item, index) {
                                console.log(item);
                                return <li key={index}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="panel-footer">
                    <input type="text" className="form-control" ref="ulData" />
                    <button className="btn btn-primary" onClick={this.keyDownClick}>留言</button>
                </div>
            </div>
        )
    }
});
ReactDOM.render(<Board/>,document.querySelector('#container'));