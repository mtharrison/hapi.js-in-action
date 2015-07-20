PROGRAM=./node_modules/lab/node_modules/eslint/bin/eslint.js
CONFIG=./node_modules/lab/lib/linters/eslint/.eslintrc
IGNORE=**/node_modules
CMD=$(PROGRAM) -c $(CONFIG) --ignore-pattern $(IGNORE)
lint:
	$(CMD) .
ch1:
	$(CMD) CH1\ -\ Introducing\ hapi/ 
ch2:
	$(CMD) CH2\ -\ Building\ an\ API/ 
ch3:
	$(CMD) CH3\ -\ Building\ a\ Website/ 
ch4:
	$(CMD) CH4\ -\ Routes\ and\ Handlers\ in\ Depth/ 
ch6:
	$(CMD) CH6\ -\ Validation\ with\ Joi/ 
ch8:
	$(CMD) CH8\ -\ Leveraging\ Caching/ 