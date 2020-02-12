import { connect } from "react-redux";
import Cobrand from "../../views/Co-branded/Cobrand";
import { register, registerBrandedCard } from "../../store/actions/actions_signup";
import { uploadProfilePhoto } from "../../store/actions/action_edit";

const mapStateToProps = (state) => {
  return {
    registration: state.register,
    edit: state.edit,
  }
}

const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    registerBrandedCard: (data) => dispatch(registerBrandedCard(data)),
    uploadProfilePhoto: (data) => dispatch(uploadProfilePhoto(data)),
  }

  return dispatchProps;
}

const Cobrandfile = connect(mapStateToProps, mapDispatchToProps)(Cobrand);

export default Cobrandfile;