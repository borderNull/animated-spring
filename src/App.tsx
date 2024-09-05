
import { useSelector, useDispatch } from 'react-redux';
import { useTransition, animated, } from "react-spring";
import { addElement, removeElement } from './features/block/blockSlice';
import { AppDispatch, RootState } from './app/store';
import './App.css';


function App() {
  const items = useSelector((state: RootState) => state.block.blockList)
  const dispatch = useDispatch<AppDispatch>();

  const addItem = () => {
    dispatch(addElement())
  };

  const removeItem = () => {
    if (items.length === 0) return;
    dispatch(removeElement())
  };

  const transitions = useTransition(items, {
    from: { x: '-100%' },
    enter: { x: '0' },
    leave: { x: '100vw' },
    keys: item => item.id,
    config: {
      duration: 500
    },
  });


  return (
    <div className="container">
      <div className="buttons">
        <button className='button' onClick={addItem}>Добавить</button>
        <button className='button' onClick={removeItem}>Удалить</button>
      </div>
      <div className="transitions-container">
        {transitions((style, item, _, index) => (
          <animated.div
            className='transitions-item'
            key={item.id}
            style={
              {
                ...style,
                backgroundColor: item.color,
                left: `${index * 20}vw`,
              }
            }
          />
        ))}
      </div>
    </div>
  );
}


export default App;