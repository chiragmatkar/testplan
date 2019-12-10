import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, css} from 'aphrodite';

import NavEntry from './NavEntry';
import {LIGHT_GREY, MEDIUM_GREY, DARK_GREY, STATUS} from "../Common/defaults";

/**
 * Render a horizontal menu of all the currently selected entries.
 */
const NavBreadcrumbs = (props) => {
  const navButtons = createNavButtons(props);
  return (
    <div className={css(styles.navBreadcrumbs)}>
      <ul className={css(styles.breadcrumbContainer)}>
        {navButtons}
      </ul>
    </div>);
};

/**
 * Create the breadcrumb entry buttons.
 *
 * @returns {Array} - Array of breadcrumb entries
 */
const createNavButtons = (props) => props.entries.map((entry, depth) => (
  <li
    key={entry.uid}
    onClick={((e) => props.handleNavClick(e, entry, depth))}>
    <div className={css(styles.breadcrumbEntry)}>
      <NavEntry
        name={entry.name}
        status={entry.status}
        type={entry.category}
        caseCountPassed={entry.case_count.passed}
        caseCountFailed={entry.case_count.failed} />
    </div>
  </li>
));


NavBreadcrumbs.propTypes = {
  /** Nav breadcrumb entries to be displayed */
  entries: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.oneOf(STATUS),
    case_count: PropTypes.shape({
      passed: PropTypes.number,
      failed: PropTypes.number,
    }),
  })),
  /** Function to handle Nav entries being clicked (selected) */
  handleNavClick: PropTypes.func,
};

const styles = StyleSheet.create({
  navBreadcrumbs: {
    top: '2.5em',
    borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)',
    zIndex: 300,
    position: 'fixed',
    display: 'inline-block',
    height: '2em',
    width: '100%',
    backgroundColor: LIGHT_GREY,
    overflowY: 'hidden',
  },
  breadcrumbContainer: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    height: '100%',
    width: '100%',
  },
  breadcrumbEntry: {
    textDecoration: 'none',
    padding: '0.25em 0em 0.25em 2em',
    float: 'left',
    position: 'relative',
    display: 'block',
    cursor: 'pointer',
    backgroundColor: MEDIUM_GREY,
    ':before': {
      content: '\' \'',
      display: 'block',
      width: 0,
      height: 0,
      borderTop: '25px solid transparent',
      borderBottom: '25px solid transparent',
      borderLeft: `20px solid ${MEDIUM_GREY}`,
      position: 'absolute',
      top: '50%',
      marginTop: '-25px',
      left: '100%',
      zIndex: 500,
    },
    ':after': {
      content: '\' \'',
      display: 'block',
      width: 0,
      height: 0,
      borderTop: '25px solid transparent',
      borderBottom: '25px solid transparent',
      borderLeft: '20px solid white',
      position: 'absolute',
      top: '50%',
      marginTop: '-25px',
      marginLeft: '2px',
      left: '100%',
      zIndex: 475,
    },
    ':hover': {
      background: DARK_GREY,
    },
    ':hover:before': {
      borderLeftColor: DARK_GREY,
    }
  },
});

export default NavBreadcrumbs;
