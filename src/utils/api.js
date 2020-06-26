import axios from "axios";

const URL = "https://starnavi-frontend-test-task.herokuapp.com";

export async function gameSettings() {
  try {
    const res = await axios.get(`${URL}/game-settings`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function gameWinners() {
  try {
    const res = await axios.get(`${URL}/winners`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export function winnersUpdater(winner, date) {
  try {
    axios.post(`${URL}/winners`, {
      winner,
      date,
    });
  } catch (error) {
    console.error(error);
  }
}
