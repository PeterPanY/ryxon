import { Row } from '..';
import { mount } from '../../../test';

test('should add "r-row--nowrap" class when wrap prop is false', () => {
  const wrapper = mount(Row, {
    props: {
      wrap: false,
    },
  });
  expect(wrapper.classes()).toContain('r-row--nowrap');
});
