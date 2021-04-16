pragma solidity 0.5.0;

import "./EERC721Full.sol";

contract Art is ERC721Full {
  string[] public arts;
  mapping(string => bool) _artExists;

  constructor() ERC721Full("Art", "ART") public {
  }

  // E.G. art = "#FFFFFF"
  function mint(string memory _art) public {
    require(!_artExists[_art]);
    uint _id = arts.push(_art);
    _mint(msg.sender, _id);
    _artExists[_art] = true;
  }

}
