import React from 'react';

const initialstate = {
	id : 0,
	todo : '',
	list : [],
	done: []
}

class CashFlow extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialstate;
    this.editItem = this.editItem.bind(this);
    this.delItem = this.delItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.undo = this.undo.bind(this);
  }

//Deleting an transaction 
  delItem = (event) => {
    let x = this.state.list
    let pos = -1
    for(let i=0; i<x.length; i++)
    {
  		if(`${x[i].id}` === event.target.id)
  		{
  			pos = i;
  			break;
  		}
    }
    if(this.state.done === []) {
    	this.setState({
    		done: x[pos]
    	})
    }
    else {
    	let donelist = this.state.done.concat(x[pos])
    	this.setState({
    		done: donelist
    	})
    }
    x.splice(pos,1);
    this.setState({ list : x })
  }

// undo deleted items
  undo = (e) => {
    let doneList = this.state.done
    let pos = -1
    let item = null
    for(let i=0; i<doneList.length; i++) {
      if(`${doneList[i].id}` === e.target.id) {
        item = doneList[i]
        pos = i
        break;
      }
    }
    doneList.splice(pos, 1)
    let list = this.state.list.concat(item)
    this.setState({
      list: list,
      done: doneList
    })

  }

//Adding new item 
  addItem = (event) => {
    
    let currentdate = new Date(); 
    let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " at "  
                + (currentdate.getHours()===0?12:currentdate.getHours()) + ":"  
                + currentdate.getMinutes();

    let newItem = { 
        id : this.state.id,
        todo : this.state.todo,
        date : datetime  
      }

    if(this.state.todo !== '')
    {
      this.state.list.push(newItem)
      this.setState({ id : this.state.id + 1 })
      this.setState({ todo: ''})
    }
  }

// Edit items

editItem = (e) => {
  let list = this.state.list.slice()
  for(let i=0; i<list.length; i++) {
    if(`${list[i].id}` === e.target.id) {
      let item = e.target.value
      list[i].todo = item
      if(this.state.list[i] !== list[i]) { 
        this.setState({
          list: list
        })
      }
    }
  }
}

  render() {
    return (
      <div>
      <header>
      	<span className="logo">W Initiative</span>
      </header>

        <div>
        <h5>Todo</h5>
        <input
        className="additem"
        type="text"
        value={this.state.todo}
        id="newTodo"
        autofill="false"
        autoComplete="off"
        onChange= {(event)=>{ this.setState({todo : event.target.value }) } } placeholder="What next?" /> 

        <button onClick={this.addItem}>Add</button>
        <ul className="list">
          {this.state.list.length !== 0
            ? this.state.list.map((item) => (
              <li key={item.id}>
                <input id={item.id} type="checkbox" className="checkbox"/>
              <span id={item.id} onClick={this.delItem} className="checkmark"></span>
                <span className="todo_item"><input className="todo_list" id={item.id} type="text" defaultValue={item.todo} onChange={this.editItem}/> </span><span className="date">{item.date}</span>
              </li>
              ))
            : <span className="empty">You have nothing to do for today. Start adding your work.</span>
          }
        </ul>
        </div>

        <div>
        <h5>Today's Log</h5>
        <span onClick= {()=> this.setState({done: initialstate.done }) } className="clear">Clear all</span>
        <ul className="list cross">
        {this.state.done.length !== 0
            ? this.state.done.map((item) => (
                <li key={item.id} > 
                <input id={item.id} type="checkbox" defaultChecked className="checkbox" />
  				      <span id={item.id} className="checkmark" onClick={this.undo}></span>
                <span className="todo_item">{item.todo}</span> <span className="date">{item.date}</span>
                </li>
              ))
            : <span className="empty">Get things done!</span>
          }
        </ul>
        </div>

      </div>
    );
  }
}

export default CashFlow;
