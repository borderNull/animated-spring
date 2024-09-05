import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export interface IBlock {
  color: string;
  id: string;
}

export interface BlockState {
  blockList: Array<IBlock>;
}

const initialState: BlockState = {
  blockList: [],
} satisfies BlockState as BlockState

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {

    addElement: (state) => {
      const newElement = {
        id: uuidv4(),
        color: getRandomColor(),
      };
      state.blockList.unshift(newElement)
    },


    removeElement: (state) => {
      state.blockList.pop()
    }
  },
})

export const { addElement, removeElement } = blockSlice.actions



export default blockSlice.reducer