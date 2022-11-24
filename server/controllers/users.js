import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ data: user });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const preformatted = friends.map(
      ({ _id, firstName, lastName, occupation, location, picurePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picurePath,
      })
    );
    res.status(200).json({ data: preformatted });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id != friendId);
      friend.friends = friend.friends.filter((fid) => fid !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    //send new list of friends for the current user
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const preformatted = friends.map(
      ({ _id, firstName, lastName, occupation, location, picurePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picurePath,
      })
    );
    res.status(200).json({ data: preformatted });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
