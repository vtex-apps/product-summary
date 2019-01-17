export function injectIntl(Comp) {

  Comp.props = {
    intl: {}
  }
  
  return Comp
}
