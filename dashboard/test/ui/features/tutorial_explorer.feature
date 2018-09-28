Feature: Tutorial Explorer on code.org/learn

Background:
  Given I am on "http://code.org/learn"
  And I wait for the page to fully load

Scenario: Tutorial Images are Rendered
  Then I wait to see an image "minecraft"
