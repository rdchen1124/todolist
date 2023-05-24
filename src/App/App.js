function App() {
  return (
    <div>
      <header>
        <h1>Todo List in React</h1>
      </header>
      <section>
        <input type="text" />
        <input type="button" value="addTodo" />
        {/* todo form */}
      </section>
      <section>{/* filter */}</section>
      <hr />
      <section>{/* todo items */}</section>
    </div>
  );
}

export default App;
