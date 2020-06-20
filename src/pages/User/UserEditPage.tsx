import React, { useState } from "react";

import { Menu, Image } from "semantic-ui-react";

import { connect } from "react-redux";

import { MenuItemProps } from "semantic-ui-react/dist/commonjs/collections/Menu/MenuItem";
import User from "../../models/user";
import EditProfile from "./EditProfile";
import EditPhoto from "./EditPhoto";
import EditPassword from "./EditPassword";
import EditEmail from "./EditEmail";
import { signOut } from "../../store/actions/auth";

import "./User.css";

interface Props {
  user: User;
  updateUser: (data: User) => void;
  onSignOut: () => void;
}

const UserEditPage: React.FC<Props> = ({
  user,
  updateUser,
  onSignOut,
}: Props) => {
  const [activeItem, setActiveItem] = useState("profile");
  const [avatar, setAvatar] = useState(
    user.imageUrl
      ? user.imageUrl
      : "https://react.semantic-ui.com/images/wireframe/square-image.png"
  );

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    data: MenuItemProps
  ) => setActiveItem(data.name || "");

  const updateAvatar = (newAvatar: any) => {
    setAvatar(newAvatar);
    updateUser({ ...user, imageUrl: newAvatar });
  };

  const updateProfile = (data: object) => {
    updateUser({ ...user, ...data });
  };

  const { name, surName } = user;

  return (
    <div className="edit-profile">
      <Menu pointing vertical>
        <Menu.Item>
          <div className="edit-menu-data">
            <Image
              className="edit-menu-item"
              src={avatar}
              size="small"
              circular
            />
            <div className="edit-menu-item">{`${name} ${surName}`}</div>
          </div>
        </Menu.Item>
        <Menu.Item
          name="profile"
          active={activeItem === "profile"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="photo"
          active={activeItem === "photo"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="email"
          active={activeItem === "email"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="password"
          active={activeItem === "password"}
          onClick={handleItemClick}
        />
      </Menu>
      <div className="edit-content">
        {activeItem === "profile" && (
          <EditProfile
            user={user}
            updateProfile={updateProfile}
            onSignOut={onSignOut}
          />
        )}
        {activeItem === "photo" && (
          <EditPhoto avatar={avatar} setAvatar={updateAvatar} user={user} />
        )}
        {activeItem === "email" && (
          <EditEmail user={user} updateProfile={updateProfile} />
        )}
        {activeItem === "password" && <EditPassword user={user} />}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  updateUser: (user: User) =>
    dispatch({ type: "UPDATE_PROFILE", payload: user }),
  onSignOut: () => {
    dispatch(signOut());
  },
});

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEditPage);
