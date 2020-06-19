import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Switch, useRouteMatch } from "react-router-dom";
import { RootState } from "../../../store";
import { getLectures } from "../../../store/actions/getLectures";
import LecturesTable from "./LecturesTable";
import UpdatePage from "../../Lectures/Update/UpdatePage";
import PrivateRoute from "../../../PrivateRoute";

const mapDispatchToProps = (dispatch: Function) => ({
  getLectures: () => dispatch(getLectures()),
});

const mapStateToProps = (state: RootState) => ({
  lecturesList: state.lectures.lectures,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const GeneralLectures = ({ lecturesList, getLectures }: PropsFromRedux) => {
  const { path } = useRouteMatch();

  useEffect(() => {
    getLectures();
  }, [getLectures]);

  return (
    <Switch>
      <PrivateRoute exact path={path} isAdmin>
        <LecturesTable lecturesList={lecturesList} />
      </PrivateRoute>
      <PrivateRoute path={`${path}/:id`} isAdmin>
        <UpdatePage lecturesList={lecturesList} />
      </PrivateRoute>
    </Switch>
  );
};

export default connector(GeneralLectures);
