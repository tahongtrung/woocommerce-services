/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import NumberInput from './number-input';
import parseNumber from 'lib/utils/parse-number';
import FieldError from 'components/field-error';
import FieldDescription from 'components/field-description';
import sanitizeHTML from 'lib/utils/sanitize-html';

class NumberField extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		description: PropTypes.string,
		value: PropTypes.oneOfType( [
			PropTypes.string,
			PropTypes.number,
		] ).isRequired,
		updateValue: PropTypes.func,
		error: PropTypes.oneOfType( [
			PropTypes.string,
			PropTypes.bool,
		] ),
		className: PropTypes.string,
	};

	onChange = ( event ) => this.props.updateValue( parseNumber( event.target.value ) );

	render() {
		const {
			id,
			title,
			description,
			value,
			placeholder,
			error,
			className,
		} = this.props;

		return (
			<FormFieldset className={ className }>
				<FormLabel htmlFor={ id } dangerouslySetInnerHTML={ sanitizeHTML( title ) } />
				<NumberInput
					id={ id }
					name={ id }
					placeholder={ placeholder }
					value={ value }
					onChange={ this.onChange }
					isError={ Boolean( error ) }
				/>
				{ error ? <FieldError text={ error } /> : <FieldDescription text={ description } /> }
			</FormFieldset>
		);
	}
}

export default NumberField;
